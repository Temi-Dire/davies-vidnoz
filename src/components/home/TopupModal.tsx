import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useGetPaymentChoices, useTopUp } from "@/hooks/usePayment";
import toast from "react-hot-toast";
import { Rings } from "react-loader-spinner";

interface TopupModalProps {
  isTopupOpen: boolean;
  setIsTopUpOpen: (value: boolean) => void;
}

type Amount = { price: number | null; method: string | null };

const TopupModal: React.FC<TopupModalProps> = ({ isTopupOpen, setIsTopUpOpen }) => {
  const [selectedAmount, setSelectedAmount] = useState<Amount>({ price: null, method: null });

  const paymentChoicesQuery = useGetPaymentChoices();

  const topUpQuery = useTopUp();

  const [isLoading, setIsLoading] = useState(false);

  const handleTopUp = () => {
    if (!isLoading) {
      setIsLoading(true);
      if (selectedAmount.price && selectedAmount.method) {
        const { price, method } = selectedAmount;
        topUpQuery.mutate(
          { price, method },
          {
            onSuccess: (res) => {
              window.location.href = res.link;
            },
          }
        );
      } else {
        toast.error("Please select an amount to top-up");
      }
    } else return;
  };

  return (
    <Dialog open={isTopupOpen} onOpenChange={() => setIsTopUpOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Top-up</DialogTitle>
          {/* <DialogDescription> This action cannot be undone. This will permanently delete your account and remove your data from our servers. </DialogDescription> */}
        </DialogHeader>
        <div className="flex gap-x-4">
          <div className="w-full gap-5 grid grid-cols-3 grid-rows-8">
            {paymentChoicesQuery &&
              paymentChoicesQuery?.data &&
              paymentChoicesQuery?.data.map(({ method, choices }) =>
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                choices.map(({ price }, i) => (
                  <div
                    key={i}
                    className={` text-center ${
                      price !== selectedAmount.price ? " border bg-white text-black" : " bg-purple-700 text-white "
                    } rounded-lg p-2 border-[#000000] cursor-pointer `}
                    onClick={() => {
                      setSelectedAmount({ price, method });
                    }}
                  >
                    {price} USD
                  </div>
                ))
              )}
          </div>
          {/* <div className="w-full space-y-5">
                    {availableOptions.map( ({price, currency}, i) =>
                         currency === 'crypto' &&
                          <div key={i}
                           className={` text-center ${price !== selectedAmount.price ? ' border bg-white text-black' : ' bg-purple-700 text-white '} rounded-lg p-2 border-[#000000] cursor-pointer `}
                           onClick={() => {setSelectedAmount({price, currency})}}
                           >
                            {price} crypto
                        </div>)}
                    </div> */}
        </div>
        <Button
          disabled={Boolean(!(selectedAmount.price && selectedAmount.method))}
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={handleTopUp}
        >
          {!isLoading ? <p>Pay</p> : <Rings height="40" width="40" color="#ffffff" ariaLabel="rings-loading" />}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TopupModal;
