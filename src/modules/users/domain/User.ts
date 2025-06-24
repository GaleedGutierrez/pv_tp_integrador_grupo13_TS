interface Name {
	firstname: string;
	lastname: string;
}

interface UserInterface {
	id: `${string}-${string}-${string}-${string}-${string}`;
	email: string;
	password: string;
	username?: string;
	name?: Name;
	phone?: string;
}

export class User {
	/** Unique identifier for the user. */
	public id: `${string}-${string}-${string}-${string}-${string}`;
	/** Email address of the account. It is unique */
	public email: string;
	/** Password for the user account. */
	public password: string;
	/** Username is a unique identifier for the user, optional. */
	public username?: string;
	/** Name of the user, optional. */
	public name?: {
		firstname: string;
		lastname: string;
	};
	/** Phone number of the user, optional. */
	public phone?: string;

	/**
	 * Creates a new User instance.
	 * @param parameters - The parameters to initialize the user.
	 */
	public constructor(parameters: UserInterface) {
		const { id, email, password, username, name, phone } = parameters;

		this.id = id;
		this.email = email;
		this.password = password;
		this.username = username;
		this.name = name;
		this.phone = phone;
	}
}
