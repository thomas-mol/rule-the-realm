import { useCallback } from "react";
import { useAddGame } from "../api/hooks/useGames";
import { useVillains } from "../api/hooks/useVillains";
import Dialog from "../components/Dialog/Dialog";
import { useConfirmationDialog } from "../components/Dialog/useConfirmationDialog";
import Form from "../components/Form/Form";
import { TGameSessionSchema } from "../schemas";

const FormPage = () => {
  const {
    data: villains,
    isLoading: villainsLoading,
    error: villainsError,
  } = useVillains();

  const { mutate, isError, error: submitError } = useAddGame();

  const { isOpen, openDialog, closeDialog, confirmAction } =
    useConfirmationDialog<TGameSessionSchema>({
      onConfirm: (data) => {
        console.log("Form submitted! 📨");
        mutate(data);
      },
    });

  const handleSubmit = useCallback(
    (data: TGameSessionSchema, reset: () => void) => {
      openDialog(data, reset);
    },
    [openDialog]
  );

  return (
    <div>
      {villainsLoading && <p>Loading villains...</p>}

      {villainsError && (
        <p className="error-message">
          Error loading villains: {villainsError.message || "Unknown error"}
        </p>
      )}

      {villains && (
        <>
          <Form villains={villains} onSubmit={handleSubmit} />

          {isError && (
            <p className="error-message">
              Failed to add game: {submitError?.message || "Unknown error"}
            </p>
          )}
        </>
      )}

      <Dialog
        isOpen={isOpen}
        onConfirm={confirmAction}
        onClose={closeDialog}
        title="Confirm"
        message="Are you sure you want to add this game?"
      />
    </div>
  );
};

export default FormPage;
