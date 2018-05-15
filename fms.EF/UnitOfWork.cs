using System;
using fms.Model;

namespace fms.EF
{
    public class UnitOfWork : IDisposable
    {
        private FMSContext fmsContext = new FMSContext();
        private FmsRepository<Address> addressRepository;
        private FmsRepository<Cemetery> cemeteryRepository;
        private FmsRepository<Person> personRepository;
        private FmsRepository<Gender> genderRepository;
        private FmsRepository<Funeral> funeralRepository;

        public FmsRepository<Person> PersonRepository
        {
            get
            {
                if (personRepository == null)
                {
                    personRepository = new FmsRepository<Person>(fmsContext);
                }
                return personRepository;
            }
        }

        public FmsRepository<Address> AddressRepository
        {
            get
            {
                if (addressRepository == null)
                {
                    addressRepository = new FmsRepository<Address>(fmsContext);
                }
                return addressRepository;
            }
        }

        public FmsRepository<Cemetery> CemeteryRepository
        {
            get
            {
                if (cemeteryRepository == null)
                {
                    cemeteryRepository = new FmsRepository<Cemetery>(fmsContext);
                }
                return cemeteryRepository;
            }
        }

        public FmsRepository<Gender> GenderRepository
        {
            get
            {
                if (genderRepository == null)
                {
                    genderRepository = new FmsRepository<Gender>(fmsContext);
                }
                return genderRepository;
            }
        }

        public FmsRepository<Funeral> FuneralRepository
        {
            get
            {
                if (funeralRepository == null)
                {
                    funeralRepository = new FmsRepository<Funeral>(fmsContext);
                }
                return funeralRepository;
            }
        }

        public void Save()
        {
            fmsContext.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    fmsContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}