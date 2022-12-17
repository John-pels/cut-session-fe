const validateFormInputs = (isLogin = false) => {
  const name = document.querySelector("#name") as HTMLInputElement;
  const email = document.querySelector("#email") as HTMLInputElement;
  const dateOfBirth = document.querySelector("#dob") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;
  const username = document.querySelector("#username") as HTMLInputElement;

  const nameValue = !isLogin ? name.value.trim() : "";
  const emailValue = !isLogin ? email.value.trim() : "";
  const dobValue = !isLogin ? dateOfBirth.value.trim() : "";
  const passwordValue = password.value.trim();
  const usernameValue = username.value.trim();

  //Full Name
  if (!isLogin) {
    if (nameValue === "") {
      setErrorInput(name, "Full name is required");
    } else {
      setSuccessInput(name);
    }

    //Date of Birth
    if (dobValue === "") {
      setErrorInput(dateOfBirth, "Date of Birth is required");
    } else {
      setSuccessInput(dateOfBirth);
    }

    //Email Address
    if (emailValue === "") {
      setErrorInput(email, "Email address is required");
    } else {
      validateEmail(emailValue) && setSuccessInput(email);
    }
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
  const formControl = input.parentElement as HTMLElement;
  const small = formControl.querySelector("small") as HTMLElement;
  small.innerText = errorMessage;
  formControl.className = "form__input-group error";
};

const setSuccessInput = (input: HTMLInputElement) => {
  const formControl = input.parentElement as HTMLElement;
  formControl.className = "form__input-group success";
};

const validateEmail = (email: string): boolean => {
  let regular_expressions =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regular_expressions.test(String(email).toLocaleLowerCase());
};

const validatePassword = (password: string): boolean => {
  let regular_expressions = /^(?!.* ).{6,}$/;
  return regular_expressions.test(password);
};

const formValidation = (isLogin = false) => {
  const form = document.querySelector("#form") as HTMLFormElement;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateFormInputs(isLogin);
  });
};

// const isFormValidated = (isLogin:boolean, elements:Array<HTMLElement>) => {
//   if (isLogin) {
// if(elem)
// }
// }

export { formValidation };
