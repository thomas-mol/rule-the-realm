import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Select, { MultiValue, StylesConfig } from "react-select";
import {
  gameSessionSchema,
  TGameSessionSchema,
  TVillainSchema,
} from "../../schemas";
import styles from "./Form.module.css";

interface FormProps {
  villains: TVillainSchema[];
  onSubmit: (data: TGameSessionSchema, reset: () => void) => void;
}

const customStyles: StylesConfig<any, true> = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000" : "#333",
  }),
};

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

  const villainOptions = useMemo(
    () =>
      [...villains]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ id, name }) => ({ value: id, label: name })),
    [villains]
  );

  const selectedVillainIds = watch("villains") || [];

  const eligibleWinners = useMemo(
    () =>
      villains
        .filter((villain) => selectedVillainIds.includes(villain.id))
        .map(({ id, name }) => ({ value: id, label: name })),
    [villains, selectedVillainIds]
  );

  const handleVillainsChange = (
    selected: MultiValue<{ label: string; value: string }>
  ) => {
    const selectedIds = selected.map((v) => v.value);
    setValue("villains", selectedIds);

    const currentWinnerId = getValues("winnerId");
    if (currentWinnerId && !selectedIds.includes(currentWinnerId)) {
      setValue("winnerId", "");
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => onSubmit(data, reset))}
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
              styles={customStyles}
              closeMenuOnSelect={false}
              inputId="villains"
              isMulti
              options={villainOptions}
              value={villainOptions.filter((v) =>
                field.value?.includes(v.value)
              )}
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
            <select
              {...field}
              id="winner"
              className={styles.select}
              disabled={selectedVillainIds.length === 0}
              aria-describedby={errors.winnerId ? "winner-error" : undefined}
            >
              <option value="" disabled>
                Select winner...
              </option>
              {eligibleWinners.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.winnerId && (
              <p id="winner-error" className={styles.error}>
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
