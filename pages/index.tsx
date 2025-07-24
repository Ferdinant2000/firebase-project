import DefaultLayout from "@/layouts/default";
import Form from "@/components/Form/Form"; // Путь к твоему Form.tsx
import Home from '@/pages/Home'

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Form />
      <Home />
    </DefaultLayout>
  );
}
