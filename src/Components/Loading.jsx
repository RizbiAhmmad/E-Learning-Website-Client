
const Loading = () => {
    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-50">
            <div className="relative">
                
                <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>

                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;