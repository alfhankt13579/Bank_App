import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  searchTerm: any = '';
  allTransactions: any = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.transactionHistory().subscribe(
      (result: any) => {
        console.log(result);
        this.allTransactions = result.transactions;
      },
      (result: any) => {
        console.log(result.error.message);
      }
    );
  }

  generatePdf() {
    // create object
    var pdf = new jspdf();

    // setup row for table
    let thead = ['Type', 'From Account', 'to Account', 'Amount'];
    let tbody = [];

    // setup properties
    pdf.setFontSize(16);
    pdf.text('Mini Statements', 15, 10);

    //to display as pdf,convert array of objects to nested array
    for (let item of this.allTransactions) {
      let temp = [item.type, item.fromAcno, item.toAcno, item.amount];
      tbody.push(temp);
    }

    //convert nested array into table structure using jspdf-autotable
    (pdf as any).autoTable(thead, tbody);

    //to open pdf in another tab
    pdf.output('dataurlnewwindow');

    //to download or save pdf
    pdf.save('transactionHistory.pdf');
  }
}
