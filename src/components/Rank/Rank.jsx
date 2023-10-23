const Rank = ({ userName, userEntries }) => {
   return (
      <div className="tc">
         <div className="white f3">{`${userName}, you current entry count is:`}</div>
         <div className="white f1">{`${userEntries}`}</div>
      </div>
   );
};
export default Rank;
