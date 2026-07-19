declare module "docx-preview" {
  export function renderAsync(
    file: ArrayBuffer,
    container: HTMLElement,
<<<<<<< HEAD
    options?: { renderImages?: boolean; className?: string }
=======
    options?: { renderImages?: boolean; className?: string },
>>>>>>> origin/Flashcars
  ): Promise<void>;

  export function renderOnInit(
    file: ArrayBuffer,
    container: HTMLElement,
<<<<<<< HEAD
    options?: { renderImages?: boolean; className?: string }
=======
    options?: { renderImages?: boolean; className?: string },
>>>>>>> origin/Flashcars
  ): Promise<void>;
}
