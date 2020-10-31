import React, { FC, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Table from 'react-bootstrap/esm/Table'
import Button from 'react-bootstrap/esm/Button'
import { sort } from 'rambda'

type Props = {} & RouteComponentProps

const DataTable: FC<Props> = () => {
    const [usersData, setUsersData] = useState<any[]>([])
    const [currentSort, setCurrentSort] = useState<{
        column: string
        isReverse: boolean
    }>({ column: 'id', isReverse: false })
    const [userIdToEdit, setUserIdToEdit] = useState<number | null>(null)

    const handleLoadData = () => {
        fetchUsersData().then((usersData) => {
            setUsersData(
                sortUsersBy(
                    currentSort.column,
                    currentSort.isReverse,
                    usersData
                )
            )
        })
    }
    const handleSortColumn = (columnName) => {
        const newIsReverse =
            columnName === currentSort.column ? !currentSort.isReverse : false
        setCurrentSort({ column: columnName, isReverse: newIsReverse })
        setUsersData((prevState) =>
            sortUsersBy(columnName, newIsReverse, prevState)
        )
    }

    const handleEditRow = (id) => {
        setUserIdToEdit((prevState) => (prevState === null ? id : null))
    }

    return (
        <div>
            <h3>Data Table</h3>
            <Button onClick={handleLoadData}>Load Data</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => handleSortColumn('id')}>#ID</th>
                        <th onClick={() => handleSortColumn('name')}>Name</th>
                        <th onClick={() => handleSortColumn('username')}>
                            Username
                        </th>
                        <th onClick={() => handleSortColumn('website')}>
                            Website
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user: any, index: number) => {
                        // console.log(user)
                        const editStyle =
                            user.id === userIdToEdit
                                ? { color: 'red' }
                                : undefined

                        return (
                            <tr
                                key={user.id}
                                style={editStyle}
                                onClick={() => handleEditRow(user.id)}
                            >
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.website}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

const fetchUsersData = async () => {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
    ).then((res) => res.json())
    return response.map((user) => user)
}

const sortUsersBy = (columnName: string, reverse: boolean, list: any[]) => {
    console.log('sorting users', reverse)
    const order = reverse ? -1 : 1
    return sort((a, b) => orderBy(a[columnName], b[columnName], order), list)
}

const orderBy = (a, b, direction: -1 | 1) => {
    return a < b ? direction * 1 : direction * -1
}

// onFirstRender
// useEffect(() => {
//     fetchUsersData().then((usersData) => {
//         setUsersData(usersData)
//     })
// }, [])

export default DataTable
