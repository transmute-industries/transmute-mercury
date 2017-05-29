import moment from 'moment'
export default [
    {
        Type: "CREATE_EVENT_STORE"
    },
    // {
    //     Type: "EVENT_STORE_RECEIVED"
    // },
    // {
    //     Type: "EVENT_STORE_CREATED"
    // },
    {
        Type: "PATIENT_REGISTERED",
        PatientId: 'athn-patient-0',
        PatientName: 'Hilary',
        Insurance: 'Medicare',
    },
    {
        Type: "PROVIDER_REGISTERED",
        ProviderId: 'athn-provider-0',
        ProviderName: 'Mass General'
    },
    {
        Type: "INSURER_REGISTERED",
        InsurerId: 'athn-insurer-0',
        InsurerName: 'Medicare'
    },
    {
        Type: "PATIENT_TREATED",
        PatientId: 'athn-patient-0',
        ProviderId: 'athn-provider-0',
        InsurerId: 'athn-insurer-0',
        EncounterId: 'athn-encounter-0',
        Notes: 'PHI should be stored off chain!',
        Timestamp: moment().add(1, 'days').toISOString()
    },
    {
        Type: "CLAIM_FILED",
        PatientId: 'athn-patient-0',
        ProviderId: 'athn-provider-0',
        InsurerId: 'athn-insurer-0',
        EncounterId: 'athn-encounter-0',
        Amount: '$100',
        Notes: 'Claim details should be stored off chain!'
    },
    // {
    //     Type: "CLAIM_PAYED",
    //     PatientId: 'athn-patient-0',
    //     ProviderId: 'athn-provider-0',
    //     InsurerId: 'athn-insurer-0',
    //     EncounterId: 'athn-encounter-0',
    //     Amount: '$50',
    //     Notes: 'Medicare does not cover everything :( at least the checkup was covered.'
    // },
    // {
    //     Type: "PATIENT_INVOICED",
    //     PatientId: 'athn-patient-0',
    //     ProviderId: 'athn-provider-0',
    //     InsurerId: 'athn-insurer-0',
    //     EncounterId: 'athn-encounter-0',
    //     InvoiceId: 'athn-invoice-0',
    //     Amount: '$50',
    //     Notes: 'You owe your provider $50... this data is not stored on the chain...'
    // },
    // {
    //     Type: "INVOICE_PAYED",
    //     PatientId: 'athn-patient-0',
    //     ProviderId: 'athn-provider-0',
    //     InsurerId: 'athn-insurer-0',
    //     EncounterId: 'athn-encounter-0',
    //     InvoiceId: 'athn-invoice-0',
    //     Amount: '$50',
    //     Notes: '6 Months later you remember to pay that bill...',
    //     Timestamp: moment().add(6, 'months').toISOString()
    // }
]