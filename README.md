![qwe w](https://github.com/user-attachments/assets/ea40d685-0d35-41d0-b713-1ebc24c02bbb)

# Owe No!

### track debts, keep friends
**Owe No!** is a web application that helps you track you debts and the borrowed money of other people from you so you'll never have to forget. Additionally, it has split the bill feature which is helpful when you go out with friends and needs to split the bill equally.

### 🔧 Built Using

**Owe No!** is built using these technologies:

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="30" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="30" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="30" alt="css3 logo"  />
  <img width="12" />
  <img src="https://www.svgrepo.com/show/374118/tailwind.svg" height="30" alt="tailwind logo"  />
  <img width="12" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png" height="30" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.prod.website-files.com/6320125ace536b6ad148eca3/66502d746f57d299fe0e0c31_Image%201-Express.js.webp" height="30" alt="express logo"  />
  <img width="12" />
  <img src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem.jpg" height="30" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chart.js_logo.svg/1024px-Chart.js_logo.svg.png" height="30" alt="chartjs logo"  />
</div>

## ⚙️ Installation

1. Clone the repository

```
git clone https://github.com/Ayessaaa/OweNo
```

2. Go to the directory

```
cd OweNo
```

3. Install dependecies

```
npm install
```

5. Create your own cluster on MongoDB Atlas

```
OweNo Project -> OweNoCluster
```

6. Create a database on that cluster

```
OweNo Project -> OweNoCluster -> OweNoDB
```

8. Create your .env file and paste you DBURI and secret

```
DB_URI=
secret=
```

9. Start the Nodemon

```
nodemon app
```


## ❕ Features
### Responsive Design
Owe No! is built to be compatible on both mobile and desktop devices.

### 👤 Sign Up and Log In
![wda](https://github.com/user-attachments/assets/a5b0a2a0-ff3d-406e-b72f-fe34ba061e4b)

This enables users to create and open their own accounts.

**Session** - This makes the user stay logged in for a while.

**Password hashing** - This makes the password get hashed when going to the database and when comparing it. Makes the authentication process more secure

### 🏠 Home
![hsdg](https://github.com/user-attachments/assets/b473c9a1-76ea-49c2-b2f9-718939a54b56)

**Navbar** - This shows menu and pages to explore from.

**I / Someone Borrowed Money Button** - This redirects the user to a form to list the details of the debt.

**I / They Owe Total** - This shows total debt you or other people have, click the element to redirect to its list.

**Calendar** - To display the calendar and to be aware of the due debts

**Debts Due** - This shows the list of the debts you and other people have from you. This is ordered from closest to due to farthest.

### 💲 I Owe Page
![def](https://github.com/user-attachments/assets/4c85d75e-ed11-4d27-80f4-c1361614d8f1)

**I Owe Total** - This shows the total money that you owe to other people.

**Debts Due** - This lists the debts that you haven't payed yet and the details of it. Click the element to view more.

**Paid Debts** - This lists the debts that you have payed already.

### 💲 They Owe Page
![fcr](https://github.com/user-attachments/assets/241f5029-f9b5-41f0-babb-af8842ea083c)

**They Owe Total** - This shows the total money that they owe to you.

**Debts Due** - This lists the debts that they haven't payed yet and the details of it. Click the element to view more.

**Paid Debts** - This lists the debts that they have payed already.

### 💲 I Borrowed Money
![uas](https://github.com/user-attachments/assets/a3dc2fc5-a0da-4216-b6ef-9260ea8079d2)

This prompts the user to enter the details of the debt such as
- Borrowed from
- Reason
- Date when the debt is going to be payed
- Amount

### 💲 They Borrowed Money
![ef](https://github.com/user-attachments/assets/daa1083f-e201-4f32-bfb0-fbe7c7d00c82)

This prompts the user to enter the details of the debt such as
- The borrower
- Reason
- Date when the debt is going to be payed
- Amount

### 💸 Pay Debt
![jhsa](https://github.com/user-attachments/assets/8eca7677-e4d1-48d9-8694-0cca07b1b1ff)

This allows the user to pay debts all at once or little by little. This updates the balance when the user pays some amount.

### 📜 History
![3r2](https://github.com/user-attachments/assets/6d0e51c1-c7fc-4f6b-b4f7-b3d87e432332)

This lists the payment history and borrow history. You can click each list on payment history to view more details.

### 🧾 Split The Bill
![fwe](https://github.com/user-attachments/assets/139ae4ab-67e8-4541-9295-f9ab3440ff7f)

This calculates the total bill and splits it equally to the group size.
- Expense Name
- Bill Amount
- Additional tax/ tip
- Group Size

## Resources
I have used ChatGPT to help me from debugging some parts of the project. Additionally Here are some resources that helped me create Owe No!
- [Log In, Sign Up](https://blog.logrocket.com/building-simple-login-form-node-js/)
- [Hashing Passwords](https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/)
- [Session Managment](https://dev.to/saint_vandora/how-to-implement-session-management-in-nodejs-applications-5emm)

## Contributing

This repo is open for contributions! Just fork the repository, create a new branch and open a pull request.

## License

This project is licensed under the MIT License.
