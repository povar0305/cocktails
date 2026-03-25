export interface Cocktail {
  cocktail_author: string; // Идентификатор коктейля
  cocktail_base_type: string; // Название коктейля
  cocktail_build?: string | undefined; // Легенда или рассказ, связанный с коктейлем
  cocktail_complexity_type: 'легко'|'средне'|'сложно'; // Сложность коктейля
  cocktail_ingredients: string[]; // Тип напитка
  cocktail_like: string[]; // Рекомендации по подаче
  cocktail_name: string; // Общий тип коктейля
  cocktail_note: string; //  Массив вкусов коктейля
  cocktail_story: string; // Ингредиенты
  cocktail_taste?: string[] | undefined; // Способ сборки
  cocktail_type: string; // Заметки, комментарии
  cocktail_type_cap: string; // Наименование похожих коктейлей
  cocktail_type_drinks: string; // Степень сложности
  id: string; // Автор рецепта
  score?: number | undefined; // Оценка
}
