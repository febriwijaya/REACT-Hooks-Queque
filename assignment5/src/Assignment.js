import React, { useState } from "react";
import "./App.css";
import Fade from 'react-reveal/Fade';
import Swal from "sweetalert2";

export default function App() {
  const [todos, setTodo] = useState([]);
  const [value, setvalue] = useState("");

  const remove = (e) => {
    Swal.fire({
      title: 'Apakah anda yakin memajukan antrian?',
      text: "Antrian akan dimajukan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Majukan!'
    }).then((result) => {
      if (result.isConfirmed) {
        e.preventDefault();
        let array = [...todos];
        let index = array.indexOf(0)
        array.splice(index, 1);
        setTodo(array);
        Swal.fire(
          'Dimajukan!',
          'Antrian berhasil dimajukan.',
          'success'
        )
      }
    })
  }

  const addtodo = (e) => {
    e.preventDefault();
    setTodo([value, ...todos]);
    setvalue("");
    successNotification();
  };

  const successNotification = () => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Berhasil menambahkan Antrian!',
    })
  }

  const handleInput = (e) => {
    setvalue(e.target.value)
  }

  return (
    <Fade bottom>
      <div className="container margin-down">
        <h1 className="text-center font-weight-bold my-5">Simulasi Antrian</h1>
        <hr />
        <div className="form-group">
          <form>
            <label>Masukkan Nama</label>
            <input value={value} onChange={handleInput} className="form-control" required />
          </form>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button onClick={addtodo} className="w-100 btn btn-primary">Antrikan!</button>
          </div>
          <div className="col-md-6">
            <button onClick={remove} className="w-100 btn btn-success">Majukan!</button>
          </div>
        </div>
        <hr />
        <div className="row">
          {
            todos.map((v, index) => (
              <div key={index} className="d-flex">
                <div className="card mx-1 bg-primary">
                  <div className="card-body">
                    <h2 className="text-white">{v}</h2>
                  </div>
                </div>
                {!(index === todos.length - 1) &&
                  <span class="arrow">&#8594;</span>
                }
              </div>
            ))
          }
        </div>
        <div className="my-2 text-center">
          {todos[0] ?
            <p className="font-weight-bold">Jumlah antrian: {todos.length}</p> :
            <p className="font-weight-bold">[ Antrian Kosong! ]</p>
          }
        </div>
        <hr />
      </div >
    </Fade>
  );
}
