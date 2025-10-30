const SkeletonRow = () => {
    return (
      <tr className="animate-pulse bg-gray-200">
        <td className="p-4"><div className="h-4 w-24 bg-gray-300 rounded"></div></td>
        <td className="p-4"><div className="h-4 w-32 bg-gray-300 rounded"></div></td>
        <td className="p-4"><div className="h-4 w-16 bg-gray-300 rounded"></div></td>
        <td className="p-4"><div className="h-4 w-20 bg-gray-300 rounded"></div></td>
        <td className="p-4"><div className="h-4 w-28 bg-gray-300 rounded"></div></td>
      </tr>
    );
  };
  export default SkeletonRow;
  