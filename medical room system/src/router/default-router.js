import React from 'react'

import Default from '../layouts/dashboard/default';

//table
import UserTable from '../pages/User/usertable';
import LocationTable from '../pages/Location/locationtable';
import Createlocation from '../pages/Location/createlocation';
import Editlocation from '../pages/Location/editlocation';
import CabinetTable from '../pages/Cabinet/cabinettable';
import Createcabinet from '../pages/Cabinet/createcabinet';
import Editcabinet from '../pages/Cabinet/editcabinet';
import UnitTable from '../pages/Unit/unittable';
import Createunit from '../pages/Unit/createunit';
import Editunit from '../pages/Unit/editunit';
import MasterStockTable from '../pages/MasterStock/masterstock';
import CreateMasterStock from '../pages/MasterStock/createmasterstock';
import EditMasterStock from '../pages/MasterStock/editmasterstock';
import ItemTable from '../pages/Medicine/medicinetable';
import CreateItem from '../pages/Medicine/createmedicine';
import EditItem from '../pages/Medicine/editmedicine';
import Edituser from '../pages/User/edituser';



export const DefaultRouter = [
    {
        path: '/',
        element: <Default />,
        children: [

            {
                path: '/user',
                element: <UserTable />,
                
            },
            // {
            //     path: '/user/create',
            //     element: <Createuser />
            // },
            {
                path: '/user/:id',
                element: <Edituser />
            },
            {
                path: '/location',
                element: <LocationTable />
            },
            {
                path: '/location/create',
                element: <Createlocation />
            },
            {
                path: '/location/:id',
                element: <Editlocation />
            },
            {
                path: '/cabinet',
                element: <CabinetTable />
            },
            {
                path: '/cabinet/create',
                element: <Createcabinet />
            },
            {
                path: '/cabinet/:id',
                element: <Editcabinet />
            },
            {
                path: '/unit',
                element: <UnitTable />
            },
            {
                path: '/unit/create',
                element: <Createunit />
            },
            {
                path: '/unit/:id',
                element: <Editunit />
            },
            {
                path: '/masterstock',
                element: <MasterStockTable />
            },
            {
                path: '/masterstock/create',
                element: <CreateMasterStock />
            },
            {
                path: '/masterstock/:id',
                element: <EditMasterStock />
            },
            {
                path: '/medicine',
                element: <ItemTable />
            },
            {
                path: '/medicine/create',
                element: <CreateItem />
            },
            {
                path: '/medicine/:id',
                element: <EditItem />
            },

        ]

    }
]
