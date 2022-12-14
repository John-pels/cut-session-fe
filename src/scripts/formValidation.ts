const form = document.querySelector("#form") as HTMLFormElement;
const name = document.querySelector("#name") as HTMLInputElement;
const email = document.querySelector("#email") as HTMLInputElement;
const dateOfBirth = document.querySelector("#dob") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;
const username = document.querySelector("#username") as HTMLInputElement;

const validateFormInputs = () => {
  console.log(form);
  console.log(name);
  console.log(email);
  console.log(password);
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const dobValue = dateOfBirth.value.trim();
  const passwordValue = password.value.trim();
  const usernameValue = username.value.trim();

  //Full Name

  if (nameValue === "") {
    setErrorInput(name, "Full name is required");
  } else {
    setSuccessInput(name);
  }

  //Email Address
  if (emailValue === "") {
    setErrorInput(email, "Email address is required");
  } else {
    validateEmail(emailValue) && setSuccessInput(email);
  }

  //Date of Birth
  if (dobValue === "") {
    setErrorInput(dateOfBirth, "Date of Birth is required");
  } else {
    setSuccessInput(dateOfBirth);
  }

  //Password
  if (passwordValue === "") {
    setErrorInput(password, "Password is required");
  } else {
    validatePassword(passwordValue) && setSuccessInput(password);
  }

  //Usernanme
  if (usernameValue === "") {
    setErrorInput(username, "Username is required");
  } else {
    setSuccessInput(username);
  }
};

const setErrorInput = (input: HTMLInputElement, errorMessage: string) => {
  const formControl = input.parentElement;
  const small = formControl?.querySelector("small") as HTMLElement;
  small.innerText = errorMessage;
  formControl!.className = "form__input-group error";
};

const setSuccessInput = (input: HTMLInputElement) => {
  const formControl = input.parentElement;
  formControl!.className = "form__input-group success";
};

const validateEmail = (email: string): boolean => {
  let regular_expressions =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regular_expressions.test(String(email).toLocaleLowerCase());
};

const validatePassword = (password: string): boolean => {
  let regular_expressions = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
  return regular_expressions.test(password);
};

export { form, validateFormInputs };
