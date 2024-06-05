import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">my github profile</h2>
        <p className="text-gray-500 my-2">
           Github username - shanthi1710
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://github.com/shanthi1710"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shathi1710
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
      <img src="https://miro.medium.com/v2/resize:fit:1100/1*CWFkh5z8oa6dZfn5_gkKKQ.jpeg" />
      </div>
    </div>
  );
}
