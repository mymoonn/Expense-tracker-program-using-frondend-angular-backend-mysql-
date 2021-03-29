import { Component, OnInit } from '@angular/core';
import { userInfo } from 'node:os';
import { AppService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'exincome';


  list: any = [];
  exIncome: any = [];
  utype: any;
  udate: any;
  udesc: any;
  uamt: any;
  income: any;
  expense: any;
  totalIncome: any;
  totalExpense: any;
  totalBalance: any;
  id: any;
  add = true;

  constructor(private api: AppService) {

    this.loadData();
    console.log('Request sent');
  }

  incomeFunction() {
    this.income = true;
    this.expense = false;
  }
  expenseFunction() {
    this.expense = true;
    this.income = false;
  }
  
  

  addItems(): any {
      
  
    let f = {
      date: this.udate,
      type: this.utype,
      description: this.udesc,
      amount: this.uamt,

    };

    if(this.add==true) {
      if (!this.udate) {
        alert("please enter valid date");
        return;
      }
      if (!this.utype) {
        alert("please enter valid type");
        return;
      }
      if (!this.udesc) {
        alert("please enter valid decription");
        return;
      }
      if (!this.uamt) {
        alert("please enter valid amount");
        return;
      }
  

      this.api.post('http://localhost/myinsert.php',
        f).then((x: any) => {
          this.loadData();
  
        }).catch((x: any) => {
          console.error('Error is', x);
        });
      this.api.post(`http://localhost/myupdate.php`,
        { date: this.udate } && { type: this.utype } && { description: this.udesc } && { amount: this.uamt }).then((x: any) => {
          console.log('Item Saved', x);
          this.loadData();
        }).catch((x: any) => {
          console.error('Error is', x);
        });
      // this.exIncome.push(f);
      this.api.post('http://localhost/mydel.php',
        f).then((x: any) => {
          this.loadData();
        }).catch((x: any) => {
          console.error('Error is', x);
        });
    } else {
      this.update();

    }

    this.api.post('http://localhost/load.php',
      f).then((x: any) => {
        this.loadData();
      }).catch((x: any) => {
        console.error('Error is', x);
      });
  }


  getTotalIncome() {
    let incomeTotal = this.exIncome.filter((a: any) => a.type === 'income');

    let totalIncome = incomeTotal.reduce((a: number, b: any) => {
      return a + parseInt(b.amount);
    }, 0);
    return totalIncome;
  }
  getTotalExpense() {

    let exTotal = this.exIncome.filter((x: any) => x.type === 'expense');
    this.totalExpense = exTotal.reduce((a: number, b: any) => {
      return a + parseInt(b.amount);
    }, 0);
    return this.totalExpense;
  }
  getBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  }



  deleteRow(id: any) {

    this.api.post(`http://localhost/mydel.php`,
      {
        id: id
      }).then((x: any) => {
        console.log('Item Saved', x);
        this.loadData();
      }).catch((x: any) => {
        console.error('Error is', x);
      });

  }

  async loadData() {
    try {
      let res: any = await this.api.get(`http://localhost/load.php`);
      console.log('Response is ', res);
      this.exIncome = res.data;
      this.title = res.name;
    } catch (e) {

    }
  }


  saveItem() {
    this.api.post(`http://localhost/myinsert.php`,
      { type: this.utype } && { amount: this.uamt }).then((x: any) => {
        console.log('Item Saved', x);
      }).catch((x: any) => {
        console.error('Error is', x);
      });
  }

  editRow(editedline: any) {
    // console.log('Editing row ', editedline);
    this.uamt = editedline.amount;
    this.udesc = editedline.description;
    this.utype = editedline.type;
    this.udate = editedline.date;
    this.id = editedline.id;
    this.add = false;
   

  }

  update() {
    this.add = true;
    this.add = false;
    let updatedatas = {
      date: this.udate,
      type: this.utype,
      description: this.udesc,
      amount: this.uamt,
      id: this.id
    };


    this.api.post(`http://localhost/myupdate.php`,
      updatedatas).then((x: any) => {
        console.log('Item Saved', x);
        this.loadData();
      }).catch((x: any) => {
        console.error('Error is', x);
      });  
      this.add = true;

  }
  ngOnInit(): void {

  }

}