export default interface ClientUser {
	id: string;
	avatar: string;
	age: number;
	email: string;
	name: string;
	role: string; //'admin' | 'user';
  surname: string;
}