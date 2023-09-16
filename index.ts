import { useEffect, useState } from "react";

type ErrorType = {
	isError: boolean;
	error: string | null;
};

export function useMutation<T, V>(_cb: (params: V) => Promise<T>) {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errorObject, setError] = useState<ErrorType>({
		isError: false,
		error: null,
	});

	const [data, setData] = useState<T | undefined>(undefined);

	async function mutation(params: V) {
		try {
			setError({
				isError: false,
				error: null,
			});

			setIsLoading(true);
			const res = await _cb(params);

			setData(res);
			setIsSuccess(true);
		} catch (err) {
			let message = "Something went wrong, Please try again.";

			if (
				err &&
				typeof err === "object" &&
				"message" in err &&
				typeof err.message === "string"
			) {
				message = err.message;
			}

			setError({
				isError: true,
				error: message,
			});

			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	return { data, ...errorObject, isLoading, isSuccess, mutation } as const;
}


export function useQuery<T>(_cb: () => Promise<T>) {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorObject, setError] = useState<{
		isError: boolean;
		error: string | null;
	}>({
		isError: false,
		error: null,
	});

	const [data, setData] = useState<T | undefined>(undefined);

	async function _queryFn() {
		try {
			setError({
				isError: false,
				error: null,
			});
			setIsLoading(true);
			const res = await _cb();
			setData(res);
			setIsSuccess(true);
		} catch (err) {
			let message = "Something went wrong, Please try again.";
			if (
				err &&
				typeof err === "object" &&
				"message" in err &&
				typeof err.message === "string"
			) {
				message = err.message;
			}
			setError({
				isError: true,
				error: message,
			});
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		_queryFn();
	}, []);

	return { data, ...errorObject, isLoading, isSuccess } as const;
}