export const TaskCardAttachments = () => {
  return (
    <div className="flex flex-row justify-between rounded-xs mb-3 text-xs h-14">
      <div className="mr-4 w-25 bg-neutral-300 rounded-sm"></div>
      <div className="flex-1">
        <a className="text-sm text-blue-600 hover:text-blue-700" href="">
          final-img.jpg
        </a>
        <div>
          <a href="" className="text-neutral-500 hover:text-neutral-600">
            Edit
          </a>
          <span className="mx-2 text-neutral-400">|</span>
          <a href="" className="text-neutral-500 hover:text-neutral-600">
            Remove
          </a>
        </div>
        <p className="opacity-50">Uploaded at 2020-04-18 5:25 pm</p>
      </div>
    </div>
  );
};
