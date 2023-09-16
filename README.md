## fetch-tools
A tiny collection of react hooks to manage your http request state.

### Installation

npm
```bash
npm install react-fetch-tools
```

yarn 
```bash
yarn add react-fetch-tools
```

bun 
```bash
bun add react-fetch-tools
```
### How to use?

This package comes with two react hooks (planning to add more).

- `useMutation` : mutation can be used whenever you are trying to change something on the remote data source, like using http methods such as `POST` `PUT` or `DELETE`

#### example:
```tsx
import StarsListCollection from "@/database/schemas/star-list";

import { useMutation } from "react-fetch-tools";

export function useCreateListMutation() {
	return useMutation(async function createList({
		title,
		description,
	}: {
		title: string;
		description?: string;
	}) {
		await StarsListCollection.create({
			title,
			description,
			reposCount: 0,
		});
	});
}

```

- `useQuery` : This hooks can be used whenever you are trying query remote data source, like using http method `GET`

```tsx
import StarsListCollection from "@/database/schemas/star-list";

import { useQuery } from "react-fetch-tools";

export function useGetStarLists() {
	return useQuery(async () => {
		const res = await StarsListCollection.findAll();
		return res;
	});
}
```

### contributions

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/Chakravarthy7102/react-fetch-tools/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/Chakravarthy7102/react-fetch-tools/oull) to add new features/make quality-of-life improvements/fix bugs.

## License

Licensed under the [Apache-2.0 license](https://github.com/Chakravarthy7102/react-fetch-tools/blob/main/LICENSE.md).

  
