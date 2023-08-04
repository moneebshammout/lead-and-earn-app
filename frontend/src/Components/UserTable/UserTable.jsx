import 'react-table-filter/lib/styles.css';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import faker from 'faker';
import { HorizonTable } from '../HorizonTable/HorizonTable';
import {
  faFilter,
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
library.add(faFilter, faSort, faSortUp, faSortDown);
export default function UserTable({users}) {
 
  return (
    <div className="App">
      <HorizonTable
        columns={React.useMemo(
          () => [
            {
              Header: <span style={{ color: 'white' }}>Name</span>,
              accessor: 'name',
            },
            {
              Header: <span style={{ color: 'white' }}>Email</span>,
              accessor: 'email',
            },
            {
              Header: <span style={{ color: 'white' }}>Registration Date</span>,
              accessor: 'registration_date',
            },
            {
              Header: <span style={{ color: 'white' }}>Number of Referred Users</span>,
              accessor: 'total_referrals',
            },
            {
              Header: <span style={{ color: 'white' }}>Total Points Earned</span>,
              accessor: 'total_points',
            },
          ],
          []
        )}
        data={users}
        loading={false}
        enablePagination={true}
      />
    </div>
  );
}
