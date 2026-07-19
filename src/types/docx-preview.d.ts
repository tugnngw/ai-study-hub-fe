declare module "docx-preview" {
  export function renderAsync(
    file: ArrayBuffer,
    container: HTMLElement,
<<<<<<< HEAD
<<<<<<< HEAD
    options?: { renderImages?: boolean; className?: string }
=======
    options?: { renderImages?: boolean; className?: string },
>>>>>>> origin/Flashcars
=======
    options?: { renderImages?: boolean; className?: string },
>>>>>>> origin/final/demo-v1
  ): Promise<void>;

  export function renderOnInit(
    file: ArrayBuffer,
    container: HTMLElement,
<<<<<<< HEAD
<<<<<<< HEAD
    options?: { renderImages?: boolean; className?: string }
=======
    options?: { renderImages?: boolean; className?: string },
>>>>>>> origin/Flashcars
=======
    options?: { renderImages?: boolean; className?: string },
>>>>>>> origin/final/demo-v1
  ): Promise<void>;
}
