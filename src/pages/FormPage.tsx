import { useAddGame } from "../api/hooks/useGames";
import { useVillains } from "../api/hooks/useVillains";
import Form from "../components/Form/Form";
import { TGameSessionSchema } from "../schemas";

const FormPage = () => {
  const { data: villains } = useVillains();
  const { mutate } = useAddGame();

  const handleSubmit = (data: TGameSessionSchema) => {
    mutate(data);
  };

  return (
    <div>
      {villains ? (
        <Form villains={villains} onSubmit={(data) => handleSubmit(data)} />
      ) : (
        <p>Something went wrong loading the villains.</p>
      )}
    </div>
  );
};

export default FormPage;
