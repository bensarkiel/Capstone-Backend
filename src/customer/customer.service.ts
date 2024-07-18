import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { faker } from '@faker-js/faker';
import { CustomerState } from './customer-state.enum';

@Injectable()
export class CustomerService {
  customerRepository: any;
  addressRepository: any;
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return await createdCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const existingCustomer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return existingCustomer;
  }

  async getCustomerCount(): Promise<number> {
    return await this.customerModel.countDocuments().exec();
  }

  async remove(id: string): Promise<Customer> {
    const customer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }
  /*
  async seedDummyData(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const customer = new Customer();
      customer.id = faker.datatype.uuid();
      customer.phone = faker.phone.number();
      customer.verifiedEmail = faker.datatype.boolean();
      customer.sendEmailWelcome = faker.datatype.boolean();
      customer.state = faker.helpers.arrayElement([
        CustomerState.DISABLED,
        CustomerState.INVITED,
        CustomerState.ENABLED,
        CustomerState.DECLINED,
      ]);
      customer.currency = faker.finance.currencyCode();
      const savedCustomer = await this.customerRepository.save(customer);
      const address = new Address();
      address.address1 = faker.location.streetAddress();
      address.address2 = faker.location.secondaryAddress();
      address.city = faker.location.city();
      address.province = faker.location.state();
      address.country = faker.location.country();
      address.phone = faker.phone.number();
      address.zip = faker.location.zipCode();
      address.company = faker.company.name();
      address.default = faker.datatype.boolean();
      await this.addressRepository.save(address);
    }
  }*/
}