/**
 * TODO のタイトルが有効かどうかを判定する
 * - 空文字はダメ
 * - 空白だけもダメ
 * - 100文字を超えるのもダメ
 */
export function isValidTitle(title: string): boolean {
  const trimmed = title.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.length > 100) return false;
  return true;
}
// exportをつけると、このファイルを他のファイルからimportできるようになる
export function validateTitle(rawTitle: unknown): string{
  if (typeof rawTitle !== "string"){
    throw new Error("タイトルは必須です");
  }
  const trimmed = rawTitle.trim();
  if(trimmed.length===0){
    throw new Error("タイトルは必須です");
  }
  if (trimmed.length > 100){
    throw new Error("タイトルは100文字いないにしてください");
  }
  return trimmed;
}