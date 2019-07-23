import React, { useState, Fragment, useEffect } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'

const App = () => {

	// Data

	const [usersData,setData] = useState({});

	useEffect(()=>{

		async function fetchData() {
			const res = await fetch("https://jsonplaceholder.typicode.com/posts");
			res
			  .json()
			  .then(res => setData(res))
			  .catch(err => setData(err));
		  }
		
		  fetchData();

	});


	const initialFormState = { userId: null, id: null, title: '', body: '' }

	// Setting state
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)


	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = (userId,title,body,id) => {
		setEditing(false)
		console.log(userId,title,body);
        let queryString = 'https://jsonplaceholder.typicode.com/posts/' + id;
		fetch(queryString, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: title,
			body: body,
			userId: userId })
		})
			.then(res => console.log(res));

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (userId,title,body,id) => {
		setEditing(false)
		let queryString = 'https://jsonplaceholder.typicode.com/posts/' + id;
		fetch(queryString, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: title,
			body:  body,
			userId: userId })
		})
			.then(res => res.text()) // OR res.json()
			.then(res => console.log(res));

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	}

	return (
		<div className="container">
			<h1>CRUD App with Hooks</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : null }
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={usersData} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App
