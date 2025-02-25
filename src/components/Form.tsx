import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import styles from "./Form.module.css";
import {
  gameSessionSchema,
  TGameSessionSchema,
  TVillainSchema,
} from "../schemas";

interface FormProps {
  villains: TVillainSchema[];
  onSubmit: (data: TGameSessionSchema) => void;
}

const Form = ({ villains, onSubmit }: FormProps) => {
  const {
    watch,
    setValue,
    getValues,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TGameSessionSchema>({
    defaultValues: {
      id: "temp",
      playerCount: 2,
      winnerId: "",
      date: new Date().toISOString().split("T")[0],
      villains: [],
    },
    resolver: zodResolver(gameSessionSchema),
  });

  const selectedVillainIds = watch("villains") || [];

  const handleVillainsChange = (selected: MultiValue<TVillainSchema>) => {
    const selectedIds = selected.map((v) => v.id);
    setValue("villains", selectedIds);

    const currentWinnerId = getValues("winnerId");
    if (currentWinnerId && !selectedIds.includes(currentWinnerId)) {
      setValue("winnerId", "");
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className={styles.group}>
        <label className={styles.label} htmlFor="player-count">
          Player Count 👥
        </label>
        <input
          {...register("playerCount", { valueAsNumber: true })}
          id="player-count"
          type="number"
          min="2"
          className={styles.input}
          aria-describedby={
            errors.playerCount ? "player-count-error" : undefined
          }
        />
        {errors.playerCount && (
          <p id="player-count-error" className={styles.error}>
            {errors.playerCount.message}
          </p>
        )}
      </div>

      <Controller
        control={control}
        name="villains"
        render={({ field }) => (
          <div className={styles.group}>
            <label className={styles.label} htmlFor="villains">
              Chosen Villains 😈
            </label>
            <Select
              {...field}
              closeMenuOnSelect={false}
              inputId="villains"
              isMulti
              options={villains.sort((a, b) => a.name.localeCompare(b.name))}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              value={villains.filter((v) => field.value?.includes(v.id))}
              onChange={(selected) => handleVillainsChange(selected || [])}
              classNamePrefix="react-select"
              placeholder="Select villains..."
              aria-describedby={errors.villains ? "villains-error" : undefined}
            />
            {errors.villains && (
              <p id="villains-error" className={styles.error}>
                {errors.villains.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="winnerId"
        render={({ field }) => (
          <div className={styles.group}>
            <label className={styles.label} htmlFor="winner">
              Victorious Villain 👑
            </label>
            <Select
              {...field}
              inputId="winner"
              options={villains.filter((villain) =>
                selectedVillainIds.includes(villain.id)
              )}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              value={villains.find((v) => v.id === field.value) ?? null}
              onChange={(selected) => field.onChange(selected?.id || "")}
              isDisabled={selectedVillainIds.length === 0}
              classNamePrefix="react-select"
              placeholder="Select winner..."
              aria-describedby={errors.winnerId ? "winner-error" : undefined}
              isClearable
            />
            {errors.winnerId && (
              <p id="winner-id-error" className={styles.error}>
                {errors.winnerId.message}
              </p>
            )}
          </div>
        )}
      />

      <div className={styles.group}>
        <label className={styles.label} htmlFor="date">
          Duel Date 📅
        </label>
        <input
          {...register("date")}
          id="date"
          type="date"
          className={styles.input}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && (
          <p id="date-error" className={styles.error}>
            {errors.date.message}
          </p>
        )}
      </div>

      <div className={styles.group}>
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? "Submitting..." : "Submit Game"}
        </button>
      </div>
    </form>
  );
};

export default Form;
