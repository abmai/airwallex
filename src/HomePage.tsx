import { useEffect, useState } from "react";
import ReactModal from "react-modal";

import RequestInviteForm from "./RequestInviteForm";

// Set root app element for modal accessibility
// http://reactcommunity.org/react-modal/accessibility/
ReactModal.setAppElement("#root");

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  function onRequestInviteClick() {
    setIsModalOpen(true);
  }

  function onModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="w-screen h-screen pt-20 pb-20 flex flex-col justify-center items-center">
        <h1>a better way to enjoy every day.</h1>
        <h5 className="mt-4">be the first to know when we launch.</h5>
        <button className="mt-4" onClick={onRequestInviteClick}>
          request an invite
        </button>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={onModalClose}
        className="w-96 border p-6 bg-white"
        overlayClassName="flex flex-col justify-center items-center fixed top-0 bottom-0 right-0 left-0 bg-white bg-opacity-75"
      >
        <RequestInviteForm />
      </ReactModal>
    </>
  );
}
