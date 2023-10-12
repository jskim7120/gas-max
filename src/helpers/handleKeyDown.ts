export function handleKeyDown(event: any) {
  if (event.key === "Enter") {
    event.preventDefault();
    const element = event.target;
    const form = element.form;

    if (form) {
      const index = Array.prototype.indexOf.call(form, element);

      let cursor = 1;

      while (form.elements[index + cursor] !== undefined) {
        console.log(form.elements[index + cursor]);
        if (
          form.elements[index + cursor].readOnly ||
          form.elements[index + cursor].disabled
        ) {
          cursor += 1;
        } else {
          form.elements[index + cursor].focus();
          break;
        }
      }
    }
  }
}
