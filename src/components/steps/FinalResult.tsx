import { useEffect } from "react";
import { IconThankYou } from "../../assets/icons/IconThankYou";
import store from "storejs";

export const FinalResult = () => {
  useEffect(() => {
    store.clear();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-full py-10 md:py-0">
      <IconThankYou />
      <h2 className="text-2xl font-bold pt-8">ممنون از شما</h2>
      <p className="text-sm text-center text-light-gray">
        از تأیید اشتراک شما متشکریم! امیدواریم با استفاده از پلتفرم ما لذت
        ببرید. اگر زمانی نیاز به پشتیبانی داشتید، لطفاً به ما ایمیل بزنید
        support@loremgaming.com
      </p>
    </div>
  );
};
