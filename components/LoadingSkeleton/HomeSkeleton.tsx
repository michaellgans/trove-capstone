import React from 'react';
import SkeletonCard from './SkeletonCard';

const SkeletonTable: React.FC = () => {
  return (
    <div className="animate-pulse flex justify-center m-0">
      <div className="px-5 md:px-10 w-full">
        <div className="flex mx-0 justify-center rounded-xl overflow-hidden border-[1px] border-slate-200 m-4">
          <div className="overflow-x-auto w-full">
            <table className="w-full border border-collapse table-auto">
              <thead className="bg-gradient-to-r from-brightRed/10 via-brightYellow/10 to-brightBlue/10 animate-gradient-pulse">
                <tr>
                  {Array(7)
                    .fill("")
                    .map((_, i) => (
                      <th
                        key={i}
                        className="border border-r-transparent p-2 h-4 rounded-md"
                      ></th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <tr key={i}>
                      {Array(7)
                        .fill("")
                        .map((_, j) => (
                          <td
                            key={j}
                            className="border border-x-transparent p-2 h-4 bg-gradient-to-r from-brightRed/10 via-brightGreen/10 to-brightBlue/10 animate-gradient-pulse rounded-md"
                          ></td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeSkeleton: React.FC = () => {
  return (
    <>
      <div className="mt-7 mb-7">
        <div className="h-10 w-72 bg-gradient-to-r from-brightRed/10 via-brightYellow/10 to-brightBlue/10 animate-gradient-pulse mx-auto rounded-md"></div>
      </div>
      <div className="space-y-4 mx-4">
        {Array(3)
          .fill("")
          .map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>
      <div className="mt-7">
        <div className="h-10 w-72 bg-gradient-to-r from-brightRed/10 via-brightYellow/10 to-brightBlue/10 animate-gradient-pulse mx-auto rounded-md"></div>
      </div>
      <SkeletonTable />
    </>
  );
};

export default HomeSkeleton;
