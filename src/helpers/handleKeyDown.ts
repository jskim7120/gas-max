export function handleKeyDown(event: any) {
  if (event.key === "Enter") {
    event.preventDefault();
    const element = event.target;
    const form = element.form;

    if (form) {
      const index = Array.prototype.indexOf.call(form, element);

      let cursor = 1;

      while (form.elements[index + cursor] !== undefined) {
        const nextElement = form.elements[index + cursor];

        if (nextElement.readOnly || nextElement.disabled) {
          cursor += 1;
        } else {
          if (nextElement.type === "submit") {
            nextElement.click();
          } else {
            nextElement.focus();
          }
          break;
        }
      }
    }
  }
}
