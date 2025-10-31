interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}
