interface PersonalInfoProps {
  nextStep?: () => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ nextStep }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nextStep) nextStep();
  };

  return (
    <div className="text-start">
      <h1 className="font-bold text-3xl">اطلاعات شخصی</h1>
      <span className="opacity-50 text-black text-xs">
        لطفا نام، آدرس ایمیل و شماره تلفن خود را وارد کنید.
      </span>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">نام</label>
          <input
            type="text"
            name="Name"
            minLength={2}
            maxLength={80}
            className="border border-gray-300 text-sm rounded-lg focus:border-foreground block w-full p-2.5 text-end"
            placeholder="ali"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">آدرس ایمیل</label>
          <input
            type="email"
            name="Email-Address"
            minLength={2}
            maxLength={250}
            className="border border-gray-300 text-sm rounded-lg focus:border-foreground block w-full p-2.5 text-end"
            placeholder="ali@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">
            شماره تلفن 98+
          </label>

          <input
            type="text"
            name="Phone-Number"
            minLength={11}
            maxLength={11}
            className="border border-gray-300 text-sm rounded-lg focus:border-foreground block w-full p-2.5 text-end"
            placeholder="+98 914 5555 555"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-foreground rounded-md text-right"
        >
          مرحله بعدی
        </button>
      </form>
    </div>
  );
};
