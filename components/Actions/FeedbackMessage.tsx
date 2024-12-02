interface FeedbackMessageProps {
  status: 'success' | 'error';
  message: string;
  onClose: () => void;
  onBack: () => void;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ status, message, onClose, onBack }) => {
  const bgColor = status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';

  return (
    <div className="text-center w-full">
      <div className={`${bgColor} px-5 py-2 rounded-full mb-6`}>
        <p className="font-semibold">{message}</p>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 rounded-lg bg-transparent border-[1px] border-gray-200 text-gray-600 font-semibold hover:bg-gray-200 transition ease-in-out duration-300"
        >
          Back
        </button>
        <button
          onClick={onClose}
          className="bg-brightRed w-full py-3 rounded-lg text-white font-semibold hover:brightness-110 transition ease-in-out duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FeedbackMessage;
