import { prisma } from '@/lib/prisma'
import IngredientList from '@/components/ingredients/IngredientList'

async function getIngredients() {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: { expiryDate: 'asc' }
  })
  
  return JSON.parse(JSON.stringify(ingredients))  // 직렬화
}

export default async function Home() {
  const ingredients = await getIngredients()
  
  return (
    <div>
      <div className="bg-green-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold">나의 냉장고</h2>
          <p className="mt-2 text-gray-600">현재 보관 중인 식재료를 확인하세요</p>
        </div>
      </div>
      <IngredientList initialData={ingredients} />
    </div>
  )
}