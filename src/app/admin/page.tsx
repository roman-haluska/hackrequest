import { Table, TableHeader, TableBody, TableRow, TableCell } from "@shadcn/ui";

const Admin = () => {
	return (
		<div>
			<h1>Admin Page</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{/*{users.map((user) => (*/}
					{/*	<TableRow key={user.id}>*/}
					{/*		<TableCell>{user.id}</TableCell>*/}
					{/*		<TableCell>{user.name}</TableCell>*/}
					{/*		<TableCell>{user.email}</TableCell>*/}
					{/*	</TableRow>*/}
					{/*))}*/}
				</TableBody>
			</Table>
		</div>
	);
};

export default Admin;
