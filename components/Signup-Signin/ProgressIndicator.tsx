const ProgressIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center mb-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`flex-1 h-2 mx-1 rounded-full ${
            index < currentStep ? 'bg-brightBlue' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
