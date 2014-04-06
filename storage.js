//  Declare SQL Query for SQLite
 
var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, useremail TEXT)";
var selectAllStatement = "SELECT * FROM Contacts";
var insertStatement = "INSERT INTO Contacts (useremail, userpass) VALUES (?, ?)";
var updateStatement = "UPDATE Contacts SET username = ?, useremail = ? WHERE id=?";
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE Contacts";
 
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database
 
var dataset;
var DataType;
 
 function initDatabase()  // Function Call When Page is ready.
 
{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}
 


function createNewUser(email, password) {
	// Store email and hashed password on sqlite3 DB
	
	var useremailtemp = $('input:text[id=useremail]').val();
    var userpasstemp = $('input:text[id=userpass]').val();

    db.transaction(function (tx) { tx.executeSql(insertStatement, [useremailemp, userpassemp], loadAndReset, onError); });

    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
	
	console.log("Creating new user %s", email);
}

/*
function isPasswordValid(email, password) {
	// Return true is password is valid
	return true;
}
*/

function isPasswordValid(email, password) {

        DatabaseHandler database = new DatabaseHandler(getApplicationContext());
        SQLiteDatabase db = database.getReadableDatabase();

        //SELECT
        String[] columns = {"userId"};

        //WHERE clause
        String selection = "email=? AND password=?";

        //WHERE clause arguments
        String[] selectionArgs = {email, passwords};
        Cursor c = null;

        try{
        //SELECT userId FROM login WHERE username=userName AND password=userPass
        c = db.query(DatabaseHandler.TABLE_USERS, columns, selection, selectionArgs, null, null, null);
        c.moveToFirst();
        c.close();
        }catch(Exception e){
            e.printStackTrace();
        }

        int i = c.getCount();
        if(i <= 0){
            Toast.makeText(getApplicationContext(), "Incorrect Login..\nTry Again", Toast.LENGTH_SHORT).show();
            return false;
        }
        return true;
    }//validate Login



exports.createNewUser = createNewUser;
exports.isPasswordValid = createNewUser;
