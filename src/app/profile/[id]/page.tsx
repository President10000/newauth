export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr className="bg-white h-[2px]" />
      <p className="text-4xl flex flex-col my-2 py-2">
        Profile page
        <span className="p-1 rounded bg-orange-600 text-black  mt-2">
          {params.id}
        </span>
      </p>
    </div>
  );
}
