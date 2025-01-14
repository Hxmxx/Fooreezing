interface IngredientCardProps {
  name: string;
  expiryDate: Date;
  quantity: number;
  unit: string;
  category: string;
}

export default function IngredientCard({
  name,
  expiryDate,
  quantity,
  unit,
  category
}: IngredientCardProps) {
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slideUp">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">{category}</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>수량: {quantity} {unit}</p>
        <p className={`${daysUntilExpiry <= 3 ? 'text-red-500' : 'text-gray-600'}`}>
          유통기한: {daysUntilExpiry}일 남음
        </p>
      </div>
    </div>
  );
} 