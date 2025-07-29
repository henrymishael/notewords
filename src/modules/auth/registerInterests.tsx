"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";
import { useTopics } from "@/hooks/use-topics";
import { InterestsSkeletonLoader } from "./components/interestSkeletonLoader";

// Type for the registration data from step 1
type Step1Data = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function RegisterInterestsPage() {
  const router = useRouter();
  const [selectedInterestIds, setSelectedInterestIds] = useState<string[]>([]);
  const [registrationData, setRegistrationData] = useState<Step1Data | null>(
    null
  );

  const { mutate: register, isPending } = useRegister();
  const { data: InterestsData, isPending: isTopicsPending } = useTopics();

  useEffect(() => {
    const storedData = sessionStorage.getItem("registrationData");
    if (!storedData) {
      router.push("/register");
      return;
    }

    try {
      const parsedData: Step1Data = JSON.parse(storedData);
      setRegistrationData(parsedData);
    } catch {
      router.push("/register");
    }
  }, [router]);

  const toggleInterest = (interestId: string) => {
    setSelectedInterestIds((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else if (prev.length < 3) {
        return [...prev, interestId];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedInterestIds.length < 1) {
      return;
    }

    if (!registrationData) {
      router.push("/register");
      return;
    }

    const completeRegistrationData = {
      ...registrationData,
      interests: selectedInterestIds,
      password_confirmation: registrationData.password,
    };

    register(completeRegistrationData, {
      onSuccess: () => {
        router.push("/verify-otp");
      },
    });
  };

  const handleGoBack = () => {
    router.push("/register");
  };

  if (!registrationData) {
    return (
      <div>
        <Loader2 size={36} className="text-amber-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mb-2">
          Choose Your Interests
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Step 2 of 2: Select 1-3 topics you&apos;re interested in
        </p>
        <div className="text-center">
          <span className="text-sm text-gray-500">
            Selected: {selectedInterestIds.length}/3
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mb-3">
        {isTopicsPending ? (
          <InterestsSkeletonLoader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {InterestsData &&
              InterestsData.map((interest: ITopics) => {
                const isSelected = selectedInterestIds.includes(interest.id);
                const isMaxSelected = selectedInterestIds.length >= 3;

                return (
                  <Button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    disabled={!isSelected && isMaxSelected}
                    className={`
                  relative p-4 rounded-lg border-2 transition-all duration-200 text-left hover:bg-amber-200
                  ${
                    isSelected
                      ? "border-amber-400 bg-amber-50 text-amber-800"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                  ${
                    !isSelected && isMaxSelected
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
                  >
                    <span className="text-sm text-primary  font-medium">
                      {interest.name}
                    </span>
                  </Button>
                );
              })}
          </div>
        )}
      </div>
      {selectedInterestIds.length < 1 && (
        <p className="text-amber-400 text-sm text-center mb-4">
          Please select at least one interest
        </p>
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleGoBack}
          variant="outline"
          className="flex-1 h-[54px] rounded-4xl font-semibold"
          disabled={isPending}
        >
          Go Back
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={selectedInterestIds.length < 1 || isPending}
          className="flex-1 bg-amber-400 text-white h-[54px] rounded-4xl font-semibold"
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </div>
  );
}
