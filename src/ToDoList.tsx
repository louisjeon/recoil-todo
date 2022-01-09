import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        {
          message: "Password doesn't match.",
        },
        { shouldFocus: true }
      );
    }
    console.log(data);
  };
  const onInvalid = () => {
    console.log(errors);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <span style={{ color: errors.email && "red" }}>
          {errors.email?.message || "Email"}
        </span>
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9._%+-]+\.+[A-Za-z0-9._%+-]/,
              message: "Not a valid email form.",
            },
          })}
          placeholder="Email"
        />
        <span style={{ color: errors.firstName && "red" }}>
          {errors.firstName?.message || "First Name"}
        </span>
        <input
          {...register("firstName", { required: "First name is required." })}
          placeholder="First Name"
        />
        <span style={{ color: errors.lastName && "red" }}>
          {errors.lastName?.message || "Last Name"}
        </span>
        <input
          {...register("lastName", { required: "Last name is required." })}
          placeholder="Last Name"
        />
        <span style={{ color: errors.username && "red" }}>
          {errors.username?.message || "Username"}
        </span>
        <input
          {...register("username", {
            required: "Username is requierd.",
            minLength: {
              value: 4,
              message: "Username should contain at least 4 letters.",
            },
            validate: {
              noAdmin: (value) =>
                value.includes("admin") ? "Username not allowed." : true,
              noBadWords: (value) =>
                value.includes("some_bad_word")
                  ? "Username not allowed."
                  : true,
            },
          })}
          placeholder="Username"
        />
        <span style={{ color: errors.password && "red" }}>
          {errors.password?.message || "Password"}
        </span>
        <input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password should contain at least 8 characters.",
            },
          })}
          placeholder="Password"
        />

        <span style={{ color: errors.password1 && "red" }}>
          {errors.password1?.message || "Retype password"}
        </span>
        <input
          {...register("password1", {
            required: "Retyping password is required.",
            minLength: {
              value: 8,
              message: "Password should contain at least 8 characters.",
            },
          })}
          placeholder="Retype password"
        />
        <button>add</button>
      </form>
    </div>
  );
}

export default ToDoList;
