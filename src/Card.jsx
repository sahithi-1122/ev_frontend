function Card({task})
{
    return(
        <div className='head2'>
         <div>{task.Name}</div>
      <div>{task.Location}</div>
      <div>{task.Status}</div>
      <div>{task.PowerOutput}</div>
      <div>{task.ConnectorType}</div>
      <div>{task.Actions}</div>
      </div>
    )
}
export default Card;