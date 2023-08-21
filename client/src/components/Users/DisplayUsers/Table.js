import { MdPreview } from 'react-icons/md';
import { FcEditImage } from 'react-icons/fc';
import { GrView } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from 'react-icons/md';



function Table({tableData}){
    const d = tableData;
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                d.map((data, index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data.name.toUpperCase()}</td>
                            <td><GrView size={'1.5rem'}/></td>
                            <td><FcEditImage size={'2rem'}/></td>
                            <td><MdOutlineDeleteOutline size={'2rem'}/></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default Table;