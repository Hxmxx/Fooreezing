'use client'
import { useQuery } from '@tanstack/react-query'
import { Ingredient } from '@prisma/client'
import IngredientCard from './IngredientCard'

interface IngredientType {
  id: number;
  name: string;
  category: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  imageUrl: string | null;
  storageType: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  initialData: IngredientType[];
}

export default function IngredientList({ initialData }: Props) {
  const { data: ingredients } = useQuery<IngredientType[]>({
    queryKey: ['ingredients'],
    queryFn: () => fetch('/api/ingredients').then(res => res.json()),
    initialData
  })

  if (!ingredients?.length) return <div className="text-center p-4">식재료가 없습니다.</div>

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            name={ingredient.name}
            expiryDate={new Date(ingredient.expiryDate)}
            quantity={ingredient.quantity}
            unit={ingredient.unit}
            category={ingredient.category}
          />
        ))}
      </div>
    </div>
  )
} 