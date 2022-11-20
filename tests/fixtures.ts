const eventPayloads = [
    {
        title: 'Active Event 1',
        start_at: new Date(Date.now() + 3000000),
        end_at: new Date(Date.now() + 2000000)
    },
    {
        title: 'Active Event 2',
        start_at: new Date(Date.now() + 1000000),
        end_at: new Date(Date.now() + 2000000)
    },
    {
        title: 'Inactive Event',
        start_at: new Date(Date.now() - 2000000),
        end_at: new Date(Date.now() + 3000000)
    }
]



const workshopPayloads = [
    {
        title: 'Active Workshop 1 from Event 1',
        start_at: new Date(Date.now() + 1000000),
        end_at: new Date(Date.now() + 3000000)
    },
    {
        title: ' Active Workshop 2 from Event 1',
        start_at: new Date(Date.now() + 2000000),
        end_at: new Date(Date.now() + 3000000)
    },
    {
        title: ' Inactive Workshop 3 from Event 2',
        start_at: new Date(Date.now() - 1000),
        end_at: new Date(Date.now() + 3000)
    },
    {
        title: ' Active Workshop 4 from Event 2',
        start_at: new Date(Date.now() + 50000),
        end_at: new Date(Date.now() + 3000000)
    },
    {
        title: ' Inactive Workshop 5 from Event 3',
        start_at: new Date(Date.now() - 100),
        end_at: new Date(Date.now() + 3000000)
    },
]

const reservationPayloads = [
    {
        name: 'Reservation 1 for Workshop 1',
        email: 'email@email.com'
    },
    {
        name: 'Reservation 2 for Workshop 2',
        email: 'email@email.com'
    }
]