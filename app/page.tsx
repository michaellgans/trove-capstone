import Image from "next/image";
import TransactionHistory from '@/components/TransactionHistory/page';

export default function Home() {
  return (
    <div className="bg-white">
      <section>
        <div className="w-full min-h-screen overflow-x-hidden m-0 p-0">
          <TransactionHistory />
        </div>
      </section>
    </div>
  );
}
