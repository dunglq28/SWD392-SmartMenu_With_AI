﻿using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.ListPosition
{
    public class CreateRequest
    {
        [Required(ErrorMessage = "Thiếu số sản phẩm")]
        [Range(1, int.MaxValue, ErrorMessage = "Số không hợp lệ.")]
        public int TotalProduct { get; set; }

        [Required(ErrorMessage = "Thiếu brandID")]
        [Range(1, int.MaxValue, ErrorMessage = "Số không hợp lệ.")]
        public int BrandId { get; set; }
    }
}
